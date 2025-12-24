// The module 'vscode' contains the VS Code extensibility API


// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { GoogleGenAI } = require('@google/genai') 
const path = require('path')
const fs = require('fs')

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */


function activate(context) {
	console.log("Codemmn is active babbyyy!!!")

	// this will run everytime something is saved in the file 
	let disposable = vscode.workspace.onDidSaveTextDocument( async (document) => {
			
		// check if its workingn fine or not 
		console.log("So you just saved this file....huh ??" + document.fileName)

		// ask if the settings have codemmn folder or not 
		const config = vscode.workspace.getConfiguration('codemmn')
		const apiKey = config.get('geminiApiKey')

		// agar key nhi user ko chilllao bc 
		if(!apiKey || apiKey === "") {
			vscode.window.showErrorMessage("Where the fuck is your Gemini API key?? Go to settings and search 'Codemmn' and add your key there")
			return;
		}


		// check if saamne wale ne folder me chzein khol bhi rkhi hai ya nhi
		if(!vscode.workspace.workspaceFolders){
			throw new Error("Open a folder first!!")
		}

		const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath
		const notesDir = path.join(workspaceFolder, '.codemmn')
		const notesFile = path.join(notesDir, 'studyNotes.md')

		// check the fkin memory bsdk
		// give uniq id to each file 
		const stateKey = `codemmn_bookmark_${document.uri.toString()}`

		// check last time kahan tak padha tha
		let lastLineProcessed = context.workspaceState.get(stateKey, 0)

		// totals no of line in your file 
		const currentLineCount = document.lineCount;
		
		// fixin something here 
		if(!fs.existsSync(notesFile)) {
			console.log("Notes file is missing!!! Regenerating full Notes...")
			// make the lastLineProcesseed as 0 ki bc shuru se start karo sb
			lastLineProcessed = 0
		}

		// what if agar koi bc code delete karde ?? toh reset kardo bc
		if(currentLineCount < lastLineProcessed) {
			lastLineProcessed = 0;
		}

		// one morehting isthat manlog kisi ki grandmasti ho and woh bina kuch likhe hi ctrl s press karde tohh...in that casestop there itslef 
		if(currentLineCount <= lastLineProcessed) {
			console.log("Dudeee....Make any change first!!!")
			return;
		}

		vscode.window.showInformationMessage(`Codemmn: Reading new lines (${lastLineProcessed} to ${currentLineCount})... `);

		// give some info 
		// vscode.window.showInformationMessage(`Codemmn: Working on ${path.basename(document.fileName)}... `)

		// main systemmmmm bcccc
		try {
			const ai = new GoogleGenAI({apiKey: apiKey})

			const lang = document.languageId
			const fileName = path.basename(document.fileName)

			//  dont read the whole file ...only read from last line to current line
			const newCodeRange = new vscode.Range(lastLineProcessed,0, currentLineCount, 0)

			const newCodeOnly = document.getText(newCodeRange).trim()

			// if new code is u
			if(!newCodeOnly || newCodeOnly.length < 2) {
				// memory update karo so that hum empty lines ko check karne na baith jaye bc 
				context.workspaceState.update(stateKey, currentLineCount)
				return;
			}

			// file ka content niallloooo
			// const fileContent = document.getText()

			// goood promptt they sayy
// THE FUSION PROMPT: Code First + Deep Explanation
            const prompt = `
                You are an expert Technical Mentor for ${lang} programming.
                The user has added code to: **${fileName}**.

                **NEW CODE:**
                \`\`\`${lang}
                ${newCodeOnly}
                \`\`\`

                **Instructions:**
                1. **Structure:** Always show the Code Block FIRST, then the Explanation.
                2. **Code:** Use the provided code snippet exactly as is.
                3. **Explanation:**Explain what each line of code is doing in around 2-3 lines. use simple and easy to understand language please.
                4. **Language:** If comments are in Hindi/Hinglish, use Hinglish for explanation. Otherwise, use simple English. If comments are bit funny or sarcastic then use funny language in notes to for that specifc part else use normal language.
                5. **Context:** If the user wrote a comment (e.g., "// Creating Promise"), use that as the Title.

                **Strict Output Template:**

                ### 🔹 [Title based on Comment or Logic]

                \`\`\`${lang}
                [Insert the code snippet here]
                \`\`\`

                **Explanation:**
                * **Concept:** [Explain what this code block is doing in simple terms...in 1-2 lines at max]
                * **How it's working ?** [Explain ceach line of code line by line and in 1-2 lines per line of code]
                * **Key Syntax:** [Mention any important keywords like 'async', 'promise', etc.]
            `;

			// play with gemini now 
			const response = await ai.models.generateContent({
				model: "gemini-2.5-flash",
				contents: prompt
			})

			const responseText = response.text


			


		 	// if folder doesnt exist us casee maa khod do 
			if(!fs.existsSync(notesDir)) {
				fs.mkdirSync(notesDir, {recursive: true})
			}

			const timestamp = new Date().toLocaleString('en-IN')
			const noteEntry = `\n\n---\n## ${fileName} - ${timestamp}\n\n${responseText}\n`

			fs.appendFileSync(notesFile, noteEntry, 'utf-8')

			// update the memory...ki vscode kobtao ki humne kahan tk padh liya hai already
			context.workspaceState.update(stateKey, currentLineCount)

			// give the final msg ki bc bn gye tere notess
			vscode.window.showInformationMessage(`Notes generated for ${fileName}`)

			
		} catch (error) {
			console.error('Codemmn Error:', error);
			vscode.window.showErrorMessage(`Failed to generate notes: ${error.message} `)
			
		}
	})

	context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

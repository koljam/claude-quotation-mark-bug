const Anthropic = require("@anthropic-ai/sdk");
require("dotenv").config();

const anthropic = new Anthropic();

async function test() {
	const testData = {
		title: "Meeting about „Solar Energy“ and „Wind Power“", // Note the German quotation marks
		date: "2024-03-15",
	};

	const systemMessage = `You are an assistant that processes simple meeting data. 
    Please format the given data according to the provided schema.`;

	try {
		const msg = await anthropic.messages.create({
			model: "claude-3-5-sonnet-20240620",
			max_tokens: 1000,
			temperature: 0,
			system: systemMessage,
			messages: [
				{
					role: "user",
					content: [
						{
							type: "text",
							text: JSON.stringify(testData, null, 2),
						},
					],
				},
			],
			tools: [
				{
					name: "final_response",
					description: "Process the given meeting data",
					input_schema: {
						type: "object",
						properties: {
							meetings: {
								type: "array",
								items: {
									type: "object",
									properties: {
										title: {
											type: "string",
										},
										date: {
											type: "string",
										},
									},
								},
							},
						},
					},
				},
			],
			tool_choice: {
				type: "tool",
				name: "final_response",
			},
		});

		console.log(JSON.stringify(msg.content[0].input, null, 2));
	} catch (error) {
		console.error("Error:", error);
	}
}

test();

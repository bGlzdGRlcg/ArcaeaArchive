addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	const url = new URL(request.url);

	const targetUrl =
		"https://webapi.lowiro.com/webapi/serve/static/bin/arcaea/apk";

	const modifiedRequest = new Request(targetUrl, {
		method: request.method,
		body: request.body,
	});

	try {
		const response = await fetch(modifiedRequest);
		const responseText = await response.text();

		const modifiedResponse = new Response(responseText, {
			status: response.status,
			statusText: response.statusText,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods":
					"GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		});

		return modifiedResponse;
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: error.message,
				success: false,
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}
		);
	}
}

const encoder = new TextEncoder()

const greetText = encoder.encode("Hello world hogehoge")

await Deno.writeFile("greet.txt", greetText)
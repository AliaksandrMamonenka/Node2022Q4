process.stdin.on("data", data => {
    data = data.toString().trim().split("").reverse().join("");
    process.stdout.write(data + "\n")
})
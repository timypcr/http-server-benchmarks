const app = require('express')()
    , cluster = require('cluster');

const todos = [
    { title: "Do some stuff", createdAt: new Date() },
    { title: "Do more stuff", createdAt: new Date() },
    { title: "Even more stuff", createdAt: new Date() },
    { title: "Yihaa", createdAt: new Date() },
    { title: "Java is great! Or isn't it?", createdAt: new Date() },
    { title: "Foo Bar", createdAt: new Date() },
    { title: "Lorem ipsum", createdAt: new Date() },
    { title: "Dolor sit amet", createdAt: new Date() }
];

if (cluster.isMaster) {
    let cpuCount = require('os').cpus().length;
    for (let i = 0; i < cpuCount; i += 1) cluster.fork();
}
else {
    app.get('/rest/todo', function (req, res) {
        res.json(todos);
    })

    app.listen(8080);
}
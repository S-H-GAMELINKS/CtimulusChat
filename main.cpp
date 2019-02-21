#include <iostream>
#include <httplib.h>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>

const std::string load_assets(const std::string& path) {

    std::ifstream file(path.c_str(), std::ios::in);
    
    std::stringstream stream;

    stream << file.rdbuf();

    file.close();

    std::string assets(stream.str());

    return assets;
}

int main() {

    httplib::Server svr;

    std::vector<std::string> talks;

    std::string body = load_assets("./assets/index.html");

    std::string indexjs = load_assets("./assets/index.js");

    svr.Get("/", [&](const httplib::Request& req, httplib::Response& res) {
        res.set_content(body, "text/html");
    });

    svr.Get("/api/talks", [&](const httplib::Request& req, httplib::Pesponse& res) {
        res.set_content("test", "text/json");
    });

    svr.Post("/api/talks", [&](const httplib::Request& req, httplib::Response& res) {
        res.set_content(req.body, "text/plain");
    });

    svr.Get("/index.js", [&](const httplib::Request& req, httplib::Response& res) {
        res.set_content(indexjs, "text/javascript");
    });

    svr.listen("localhost", 3000);

    return 0;
}
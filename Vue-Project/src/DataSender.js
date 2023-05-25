import axios from "axios";

let http =  axios.create({
  baseURL: "http://localhost:1729/",
  headers: {
    "Content-type": "application/json"
  }
});

class DataSender {
  getAll() {
    return http.get("/");
  }

  get(id) {
    return http.get(`/${id}`);
  }

  create(data) {
    return http.post("/add", data);
  }

  update(id, data) {
    return http.put(`/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/delete/${id}`);
  }

  deleteAll() {
    return http.delete(`/deleteAll`);
  }

  findByName(Name) {
    return http.get(`/Name/${Name}`);
  }
}

export default new DataSender();

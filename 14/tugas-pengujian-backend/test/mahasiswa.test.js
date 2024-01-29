const supertest = require("supertest");
const web = require("../web");
const mahasiswaService = require("../mahasiswa-service");

describe("mahasiswa", function () {
  it("GET /mahasiswa should list all mahasiswa", async () => {
    const dataMahasiswa = mahasiswaService.getAll();

    const result = await supertest(web).get("/mahasiswa");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(dataMahasiswa.length);
  });

  it("GET /mahasiswa should can get mahasiswa", async () => {
    const mahasiswa = mahasiswaService.get("20220040084");

    const result = await supertest(web).get(`/mahasiswa/${mahasiswa.nim}`);

    expect(result.status).toBe(200);
    expect(result.body.data.nim).toBe(mahasiswa.nim);
    expect(result.body.data.nama).toBe(mahasiswa.nama);
    expect(result.body.data.kelas).toBe(mahasiswa.kelas);
    expect(result.body.data.umur).toBe(mahasiswa.umur);
  });
});

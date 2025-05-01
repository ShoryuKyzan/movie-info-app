// jest.mock("@services/omdb", () => ({
//   getAPIKey: jest.fn().mockReturnValue("testapikey"),
// }));

// jest.mock("@services/omdb", () => {
//   // Require the original module to not be mocked...
//   const originalModule = jest.requireActual("@services/omdb");

//   return {
//     __esModule: true, // Use it when dealing with esModules
//     search: jest.fn().mockImplementation(() => {}),
//     getAPIKey: jest.fn().mockReturnValue("testapikey"),
//   };
// });
// import * as omdb from "@services/omdb";
// jest.mock("@services/omdb", () => ({
//   ...jest.requireActual("@services/omdb"),
//   getAPIKey: jest.fn().mockReturnValue("testapikey"),
// }));

// jest.spyOn(omdb, "getAPIKey").mockReturnValue("testapikey");

// jest.mock("@services/omdb", () => {
//   const actualModule = jest.requireActual("@services/omdb");
//   return {
//     ...actualModule,
//     __esModules: true,
//     getAPIKey: jest.fn(() => "testapikey"),
//   };
// });
// const omdb = require("@services/omdb"); // eslint-disable-line @typescript-eslint/no-require-imports
// import { search } from "@services/omdb";

// jest.mock("@services/omdb"); // XXX working sorta
// jest.mock("@services/omdb", () => {
//   const actualModule = jest.requireActual("@services/omdb");
//   return {
//     __esModules: true,
//     ...actualModule,
//     getAPIKey: jest.fn(() => "testapikey"),
//   };
// });
// const mockFunction = jest.spyOn("@services/omdb", "getAPIKey");
// mockFunction.mockReturnValue("testapikey");
// import * as omdb from "@services/omdb";
// import { jest } from "@jest/globals";
// jest.unstable_mockModule("@services/omdb", async () => {
//   const omdbModule = await import("@services/omdb");
//   return {
//     __esModules: true,
//     ...omdbModule,
//     getAPIKey: jest.fn(() => "testapikey"),
//   };
// });
// const omdb = await import("@services/omdb");

// const getAPIKeyMock = jest.fn(() => omdb.getAPIKey);
// getAPIKeyMock.mockReturnValue(() => "testapikey");
// eslint-disable-next-line @typescript-eslint/no-require-imports
// const omdb = require("@services/omdb");
// jest.mock(omdb.getAPIKey);
// const mockFunction = jest.spyOn(omdb, "getAPIKey");
// mockFunction.mockReturnValue("testapikey");

/// NOTE: All of the above attempts to mock the getAPIKey function do not work
// maybe its an issue of esmodules vs commonjs, or the way jest is configured, or
// just some limitation of ts-jest?
// i also tried js and babel config.

import * as omdb from "@services/omdb";

const sampleObj = {
  Title: "Wreck",
  Year: "2022–",
  Rated: "N/A",
  Released: "01 Mar 2023",
  Runtime: "N/A",
  Genre: "Comedy, Drama, Horror",
  Director: "N/A",
  Writer: "Ryan J. Brown",
  Actors: "Jodie Tyack, Oscar Kennedy, Thaddea Graham",
  Plot: "A young man joins the crew of a cruise ship in order to investigate the disappearance of his sister.",
  Language: "English",
  Country: "United Kingdom",
  Awards: "3 nominations total",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BM2ExOGM4MzgtYWI0ZC00ZDVkLWJiMzgtZGJkYzUyZjFhYTg0XkEyXkFqcGc@._V1_SX300.jpg",
  Ratings: [{ Source: "Internet Movie Database", Value: "6.6/10" }],
  Metascore: "N/A",
  imdbRating: "6.6",
  imdbVotes: "4,943",
  imdbID: "tt8983318",
  Type: "series",
  totalSeasons: "2",
  Response: "True",
};

describe("omdb", () => {
  describe("search", () => {
    beforeAll(() => {
      // as demonstrated above, mocking the actual get api key function does not work properly
      process.env.NEXT_PUBLIC_OMDB_API_KEY = "testapikey";
    });
    afterAll(() => {
      delete process.env["NEXT_PUBLIC_OMDB_API_KEY"];
    });
    it("exception without title", async () => {
      await expect(() => omdb.search({ title: "" })).rejects.toThrow(
        "Title is required"
      );
    });
    it("success", async () => {
      // horrible shortcuts i know
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      async function mockFetch(..._params: any): Promise<Response> {
        return {
          ok: true,
          json: async () => sampleObj,
        } as Response;
      }
      const fetchSpy = jest
        .spyOn(globalThis, "fetch")
        .mockImplementation(mockFetch);
      const result = await omdb.search({ title: "Wreck" });
      expect(fetchSpy).toHaveBeenCalledWith(
        "https://www.omdbapi.com/?apikey=testapikey&t=Wreck"
      );
      expect(result).toEqual(sampleObj);
      jest.restoreAllMocks();
    });
  });
  describe("getApiKey", () => {
    afterAll(() => {
      delete process.env["NEXT_PUBLIC_OMDB_API_KEY"];
    });
    it("exception without key", async () => {
      delete process.env["NEXT_PUBLIC_OMDB_API_KEY"];
      expect(omdb.getAPIKey).toThrow("OMDb API key is not set");
    });
    it("success", async () => {
      process.env.NEXT_PUBLIC_OMDB_API_KEY = "testapikey";
      expect(omdb.getAPIKey()).toEqual("testapikey");
    });
  });
});

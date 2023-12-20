import Image from "next/image";
import CardGrid from "./components/cardgrid";
import { url } from "inspector";

type Params = {
  searchParams: {
    page?: number;
  };
};
type Character = {
  name?: string | null | undefined;
  id?: number | null | undefined;
  species?: boolean | null | undefined;
  image?: string | null | undefined;
};

export default async function Home({ searchParams }: Params) {
  let pageContent = <></>;
  async function GetData() {
    let urlLink: string = "http://localhost:3000/characters";
    try {
      if (searchParams.page) {
        urlLink = urlLink + "?page=" + searchParams.page;
      }
      const res = await fetch(urlLink, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data.results);
      const characters: Character[] = data.results as Character[];
      pageContent = (
        <>
          <CardGrid
            character={characters}
            maxpages={data.info.pages}
          ></CardGrid>
        </>
      );
      return pageContent;
    } catch (error) {
      return null;
    }
  }
  return await GetData();
}

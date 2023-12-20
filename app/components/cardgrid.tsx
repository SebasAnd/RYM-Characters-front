"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Grid,
  Pagination,
  PaginationItem,
  colors,
} from "@mui/material";
import { ChairAlt } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

interface Props {
  character: Character[];
  maxpages: number;
}
type Character = {
  name?: string | null | undefined;
  id?: number | null | undefined;
  species?: boolean | null | undefined;
  image?: string | null | undefined;
};

const CardGrid = ({ character, maxpages }: Props) => {
  const { push } = useRouter();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    push("/?page=" + value);
  };

  function HFilter(elements: Character) {
    if ("" + elements.species === "Human") {
      return elements;
    }
  }
  character = character.filter(HFilter);
  return (
    <>
      <div>
        <Pagination
          className="bg-white"
          count={maxpages}
          renderItem={(item) => (
            <Link href={`/${item.page === 1 ? "" : `?page=${item.page}`}`}>
              <PaginationItem {...item} />
            </Link>
          )}
          onChange={handleChange}
        />
        <Grid container spacing={2}>
          {character.map((chrt) => (
            <Grid key={chrt.id} item xs={4}>
              {chrt.name} - {chrt.species}
              <Image
                src={chrt.image ? chrt.image : ""}
                width={500}
                height={500}
                alt="Picture of the author"
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default CardGrid;

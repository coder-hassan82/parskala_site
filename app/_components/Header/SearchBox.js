"use client";

import style from "@/app/_style/Header.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router"; // ← درست برای Pages Router
import { useState, useEffect } from "react";

function SearchBox() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.search) {
      setSearchValue(router.query.search);
    }
  }, [router.query.search]);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(router.query);

    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.push(`/category?${params.toString()}`);
  };

  return (
    <form className={style.searchBox} onSubmit={handleSearch}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={style.glass} />
      <input
        className={style.input}
        type="text"
        placeholder="جستجو در هزاران محصول..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  );
}

export default SearchBox;

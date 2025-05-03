"use client";

import style from "@/app/_style/Header.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

function SearchBox() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    // همیشه بفرست به مسیر /category با پارامترها
    router.replace(`/category?${params.toString()}`);
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

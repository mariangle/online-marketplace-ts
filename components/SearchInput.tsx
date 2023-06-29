import ProfilePicture from "./ProfilePicture";
import Link from "next/link";
import { Input } from "@/components/ui/input"


import { useEffect, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { IUser } from "@/common.types";
import { getUsers } from "../actions/getUsers";

const SearchInput = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleFilter = (value: string) => {
    setSearchQuery(value);
    setShowDropdown(value !== "");
  };

  const handleClickUser = () => {
    setShowDropdown(false);
    setSearchQuery("");
  };

  const filteredUsers = users.filter(({ name }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="flex gap-5 items-center justify-between relative">
        <HiSearch className="absolute left-2"/>
        <Input
          type="text"
          id="search"
          placeholder="Search users..."
          className="pl-8"
          value={searchQuery}
          onChange={(e: any) => handleFilter(e.target.value)}
        />
      </div>
      {showDropdown && (
        <div className="dropdown p-1" ref={dropdownRef}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Link
                key={user.id}
                className="flex gap-2 items-center hover:bg-gray-100 w-full p-2"
                href={`/${user.id}`}
                onClick={handleClickUser}
              >
                <div className="w-8 h-8">
                  <ProfilePicture user={user} />
                </div>
                <div className="text-sm font-semibold">{user.name}</div>
              </Link>
            ))
          ) : (
            <div className="text-xs p-2">No users found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;

import styles from "./students.module.scss";
import Image from "next/image";
import SearchIcon from "../../public/icons/Search-Icon.svg";
import { useEffect, useState } from "react";
import StudentItem from "@/components/StudentItem/StudentItem";
import { useRouter } from "next/router";

interface User {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
  gender: string;
}

export default function Students() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const { page, size } = router.query;
    const limit = size ? parseInt(size as string, 10) : 6;
    const skip = page ? parseInt(page as string, 10) * limit : 0;

    fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  const handleSearch = (event: any) => {
    console.log(event.target.value);
  };

  return (
    <div className={styles.studentsMainContainer}>
      <div className={styles.studentsTopContainer}>
        <h2>Students List</h2>
        <div className={styles.rightSide}>
          <form className={styles.searchBar}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              onChange={(e) => handleSearch(e)}
            />
            <button type="submit" className={styles.searchButton}>
              <Image
                src={SearchIcon}
                alt="Search"
                className={styles.searchIcon}
              />
            </button>
          </form>
          <button type="submit" className={styles.addButton}>
            ADD NEW STUDENT
          </button>
        </div>
      </div>
      <div className={styles.studentsContentContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company Name</th>
              <th>Gender</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <>
                  <tr></tr>
                  <StudentItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    email={user.email}
                    phone={user.phone}
                    companyName={user.company.name}
                    gender={user.gender}
                  />
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import styles from "./students.module.scss";
import Image from "next/image";
import SearchIcon from "../../public/icons/Search-Icon.svg";
import { ChangeEvent, useEffect, useState } from "react";
import StudentItem from "@/components/StudentItem/StudentItem";
import { useRouter } from "next/router";
import LeftArrowIcon from "../../public/icons/Left-Icon.svg";
import RightArrowIcon from "../../public/icons/Right-Icon.svg";
import AddStudentModal from "@/components/StudentModal/StudentModal";

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
  const [userData, setUserData] = useState<User[]>([]);
  const [skipValue, setSkipValue] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(6);
  const [range, setRange] = useState({ start: 0, end: 0 });
  const [totalRows, setTotalRows] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

  useEffect(() => {
    const { page, size } = router.query;
    const limit = size ? parseInt(size as string, 10) : 6;
    const skip = page ? parseInt(page as string, 10) * limit : 0;
    setSkipValue(skipValue);
    setRowsPerPage(limit);

    fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        const { users, total } = data;

        setUserData(users);
        setRange({ start: 0, end: users.length });
        setTotalRows(total);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [router.query]);

  const handleRowsPerPageChange = (event: { target: { value: string } }) => {
    const selectedRowsPerPage = parseInt(event.target.value, 10);

    fetch(
      `https://dummyjson.com/users?limit=${selectedRowsPerPage}&skip=${skipValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        const { users, total } = data;

        setUserData(users);
        setRowsPerPage(selectedRowsPerPage);
        setRange({ start: 0, end: users.length });
        setTotalRows(total);
        setHasPreviousPage(false);
        setHasNextPage(total > selectedRowsPerPage);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handlePageChange = (newPage: number) => {
    const newSkip = newPage * rowsPerPage;
    fetch(`https://dummyjson.com/users?limit=${rowsPerPage}&skip=${newSkip}`)
      .then((res) => res.json())
      .then((data) => {
        const { users } = data;

        setUserData(users);
        setPage(newPage);
        setRange({ start: newSkip, end: newSkip + users.length });

        setHasPreviousPage(newPage > 0);
        setHasNextPage((newPage + 1) * rowsPerPage < totalRows);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;

    if (searchQuery.trim() === "") {
      fetch(`https://dummyjson.com/users?limit=${rowsPerPage}&skip=0`)
        .then((res) => res.json())
        .then((data) => {
          const { users } = data;

          setUserData(users);
          setRange({ start: 0, end: users.length });
          setPage(0);
          setHasPreviousPage(false);
          setHasNextPage(true);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    } else {
      fetch(`https://dummyjson.com/users/search?q=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          const { users } = data;

          setUserData(users);
          setRange({ start: 0, end: users.length });
          setPage(0);
          setHasPreviousPage(false);
          setHasNextPage(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  };

  const handleDeleteUser = (userId: any) => {
    fetch(`https://dummyjson.com/users/${userId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isDeleted) {
          const updatedUsers = userData.filter((user) => user.id !== userId);
          setUserData(updatedUsers);
          setRange({ start: 0, end: updatedUsers.length });
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditStudent = (student: User) => {
    setSelectedStudent(student);
    openModal();
  };

  const handleUpdateStudent = (data: { [x: string]: any; id: any; }) => {
    if (selectedStudent) {
      const { id, ...updatedData } = data;

      fetch(`https://dummyjson.com/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })
        .then((res) => res.json())
        .then((updatedUser) => {
          const updatedUserData = userData.map((user) =>
            user.id === id ? updatedUser : user
          );
          setUserData(updatedUserData);
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };

  const handleAddUser = (user: any) => {
    setUserData((prevUserData) => [user, ...prevUserData]);
    setTotalRows((prevTotalRows) => prevTotalRows + 1);
  };

  return (
    <div className={styles.studentsMainContainer}>
      <AddStudentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddUser={handleAddUser}
        onUpdateStudent={handleUpdateStudent}
        selectedStudent={selectedStudent}
      />
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
          <button
            type="submit"
            className={styles.addButton}
            onClick={openModal}
          >
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
            {userData &&
              userData.map((user) => (
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
                    onDelete={handleDeleteUser}
                    onUpdate={handleEditStudent}
                  />
                </>
              ))}
          </tbody>
        </table>
        <div className={styles.tableConfigContainer}>
          <p className={styles.perPage}>Rows per page:</p>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
          <p className={styles.perPage}>
            {range.start + 1} - {range.end} of {totalRows}
          </p>
          <div>
            <button
              className={styles.paginationButton}
              onClick={() => handlePageChange(page - 1)}
              disabled={!hasPreviousPage}
            >
              <Image
                src={LeftArrowIcon}
                alt="Previous Page"
                className={styles.paginationIcon}
              />
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => handlePageChange(page + 1)}
              disabled={!hasNextPage}
            >
              <Image
                src={RightArrowIcon}
                alt="Next Page"
                className={styles.paginationIcon}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

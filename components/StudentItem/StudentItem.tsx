import styles from "./studentItem.module.scss";
import Image from "next/image";
import DumbIcon from "../../public/icons/Dumb-Icon.svg";
import PenIcon from "../../public/icons/Pen-Icon.svg";

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

interface StudentItemProps {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  gender: string;
  onDelete: (id: number) => void;
  onUpdate: (student: User) => void;
}

export default function StudentItem({
  id,
  image,
  firstName,
  lastName,
  email,
  phone,
  companyName,
  gender,
  onDelete,
  onUpdate,
}: StudentItemProps) {
  const handleDelete = () => {
    onDelete(id);
  };

  const handleUpdate = () => {
    const updatedStudent: User = {
      id,
      image,
      firstName,
      lastName,
      email,
      phone,
      company: {
        name: companyName
      },
      gender,
    };

    onUpdate(updatedStudent);
  };

  return (
    <tr className={styles.studentItemContainer}>
      <td>
        {image && <Image src={image} alt="image" width={65} height={55} />}
      </td>
      <td>
        {firstName} {lastName}
      </td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{companyName}</td>
      <td>{gender}</td>
      <td className={styles.iconContainer} style={{ textAlign: "right" }}>
        <Image
          className={styles.icon}
          src={PenIcon}
          alt="pen-icon"
          onClick={handleUpdate}
        />
      </td>
      <td className={styles.iconContainer}>
        <Image
          className={styles.icon}
          src={DumbIcon}
          alt="dumb-icon"
          onClick={handleDelete}
        />
      </td>
    </tr>
  );
}

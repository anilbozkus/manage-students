import styles from "./studentItem.module.scss";
import Image from "next/image";
import DumbIcon from "../../public/icons/Dumb-Icon.svg";
import PenIcon from "../../public/icons/Pen-Icon.svg";

interface StudentItemProps {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  gender: string;
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
}: StudentItemProps) {
  return (
    <tr className={styles.studentItemContainer}>
      <td>
        <Image src={image} alt="image" width={65} height={55} />
      </td>
      <td>
        {firstName} {lastName}
      </td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{companyName}</td>
      <td>{gender}</td>
      <td className={styles.iconContainer} style={{ textAlign: "right" }}>
        <Image src={PenIcon} alt="pen-icon" />
      </td>
      <td className={styles.iconContainer}>
        <Image src={DumbIcon} alt="dumb-icon" />
      </td>
    </tr>
  );
}

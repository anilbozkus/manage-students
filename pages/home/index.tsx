import styles from "./home.module.scss";
import GraduationIcon from "../../public/icons/Home-Graduation-Icon.svg";
import BookmarkIcon from "../../public/icons/Home-Bookmark-Icon.svg";
import PaymentsIcon from "../../public/icons/Home-Dollars-Icon.svg";
import UsersIcon from "../../public/icons/Home-Users-Icon.svg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Link href='/students' className={`${styles.box} ${styles.students}`}>
        <Image src={GraduationIcon} alt="graduation-icon" />
        <p className={styles.boxText}>Students</p>
        <h2 className={styles.boxValue}>243</h2>
      </Link>
      <Link href='/home' className={`${styles.box} ${styles.course}`}>
        <Image src={BookmarkIcon} alt="bookmark-icon" />
        <p className={styles.boxText}>Course</p>
        <h2 className={styles.boxValue}>13</h2>
      </Link>
      <Link href='/home' className={`${styles.box} ${styles.payments}`}>
        <Image src={PaymentsIcon} alt="payments-icon" />
        <p className={styles.boxText}>Payments</p>
        <h2 className={styles.boxValue}>556,000₺</h2>
      </Link>
      <Link href='/home' className={`${styles.box} ${styles.users}`}>
        <Image src={UsersIcon} alt="users-icon" />
        <p className={styles.boxText}>Users</p>
        <h2 className={styles.boxValue}>3</h2>
      </Link>
    </div>
  );
}

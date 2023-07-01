import { useRouter } from 'next/router';
import styles from "./sidebar.module.scss";
import Image from "next/image";
import avatarImage from "../../public/images/avatar.jpg";
import HomeIcon from "../../public/icons/Home-Icon.svg";
import BookmarkIcon from "../../public/icons/Bookmark-Icon.svg";
import GraduationIcon from "../../public/icons/Graduation-Icon.svg";
import PaymentIcon from "../../public/icons/Dollar-Icon.svg";
import ChartIcon from "../../public/icons/Chart-Icon.svg";
import SettingsIcon from "../../public/icons/Settings-Icon.svg";
import LogoutIcon from "../../public/icons/Logout-Icon.svg";
import Link from 'next/link';

export default function SideBar() {
    const router = useRouter();

    return (
        <div className={styles.sidebarContainer}>
            <h3 className={styles.sidebarHeader}>MANAGE COURSES</h3>
            <Image className={styles.sidebarImage} src={avatarImage} alt="avatar"/>
            <h4 className={styles.userTitle}>John Doe</h4>
            <p className={styles.userRole}>Admin</p>

            <div className={styles.navContainer}>
                <div>
                    <Link href='/home' className={`${styles.navItem} ${router.pathname === "/home" ? styles.selectedBg : ""}`}>
                        <Image className={styles.navIcon} src={HomeIcon} alt="home-icon"/>
                        <p className={styles.navText}>Home</p>
                    </Link>
                    <Link href='/home' className={styles.navItem}>
                        <Image className={styles.navIcon} src={BookmarkIcon} alt="course-icon"/>
                        <p className={styles.navText}>Course</p>
                    </Link>
                    <Link href='/students?page=0&size=6&' className={`${styles.navItem} ${router.pathname === "/students" ? styles.selectedBg : ""}`}>
                        <Image className={styles.navIcon} src={GraduationIcon} alt="graduation-icon"/>
                        <p className={styles.navText}>Students</p>
                    </Link>
                    <Link href='/home' className={styles.navItem}>
                        <Image className={styles.navIcon} src={PaymentIcon} alt="payment-icon"/>
                        <p className={styles.navText}>Payment</p>
                    </Link>
                    <Link href='/home' className={styles.navItem}>
                        <Image className={styles.navIcon} src={ChartIcon} alt="report-icon"/>
                        <p className={styles.navText}>Report</p>
                    </Link>
                    <Link href='/home' className={styles.navItem}>
                        <Image className={styles.navIcon} src={SettingsIcon} alt="settings-icon"/>
                        <p className={styles.navText}>Settings</p>
                    </Link>
                </div>
                <Link href='/login' className={styles.navItem}>
                    <p className={styles.logoutText}>Logout</p>
                    <Image className={styles.logoutIcon} src={LogoutIcon} alt="logout-icon"/>
                </Link>
            </div>
        </div>
    )
}
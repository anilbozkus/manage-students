import { useRouter } from 'next/router';
import styles from "./sidebar.module.scss";
import Image from "next/image";
import avatarImage from "../../public/images/avatar.jpg";
import HomeIcon from "../../public/icons/Home-Icon.svg";
import BookmarkIcon from "../../public/icons/Bookmark-Icon.svg";

export default function SideBar() {
    const router = useRouter();

    return (
        <div className={styles.sidebarContainer}>
            <h2 className={styles.sidebarHeader}>MANAGE COURSES</h2>
            <Image className={styles.sidebarImage} src={avatarImage} alt="avatar"/>
            <h4 className={styles.userTitle}>John Doe</h4>
            <p className={styles.userRole}>Admin</p>

            <div className={styles.navContainer}>
                <div>
                    <a href='/home' className={`${styles.navItem} ${router.pathname === "/home" ? styles.selectedBg : ""}`}>
                        <Image className={styles.navIcon} src={HomeIcon} alt="home-icon"/>
                        <p className={styles.navText}>Home</p>
                    </a>
                    <a href='/home' className={styles.navItem}>
                        <Image className={styles.navIcon} src={BookmarkIcon} alt="course-icon"/>
                        <p className={styles.navText}>Course</p>
                    </a>
                </div>
            </div>
        </div>
    )
}
import styles from "./header.module.scss"
import Image from "next/image";
import BellIcon from "../../public/icons/Bell-Icon.svg";
import BackIcon from "../../public/icons/Back-Icon.svg";

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <Image src={BackIcon} alt="back-icon"/>
            <Image src={BellIcon} alt="bell-icon"/>
        </div>
    )
}

import React, { useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import styles from "./studentModal.module.scss";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
  gender: string;
  image: string;
}

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: User) => void;
  onUpdateStudent: (data: { [x: string]: any; id: any }) => void;
  selectedStudent: User | null;
}

const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
  onUpdateStudent,
  selectedStudent,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<User>();

  useEffect(() => {
    if (selectedStudent) {
      const { id, firstName, lastName, email, phone, company, gender, image } =
        selectedStudent;
      setValue("id", id);
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("image", image);
      setValue("email", email);
      setValue("phone", phone);
      setValue("company.name", company.name);
      setValue("gender", gender);
    } else {
      reset();
    }
  }, [selectedStudent, reset, setValue]);

  const onSubmit = async (data: User) => {
    if (selectedStudent) {
      onUpdateStudent(data);
    } else {
      try {
        const response = await fetch("https://dummyjson.com/users/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const newUser = await response.json();
        onAddUser(newUser);
        onClose();
        reset();
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  const onCancel = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      className={styles.modal}
      overlayClassName="custom-overlay"
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", { required: true })}
            className={styles.input}
          />
          {errors.firstName && (
            <span className={styles.error}>First name is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", { required: true })}
            className={styles.input}
          />
          {errors.lastName && (
            <span className={styles.error}>Last name is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className={styles.input}
          />
          {errors.email && (
            <span className={styles.error}>Email is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone", { required: true })}
            className={styles.input}
          />
          {errors.phone && (
            <span className={styles.error}>Phone is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="company.name" className={styles.label}>
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            {...register("company.name", { required: true })}
            className={styles.input}
          />
          {errors.company?.name && (
            <span className={styles.error}>Company name is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender" className={styles.label}>
            Gender
          </label>
          <input
            type="text"
            id="gender"
            {...register("gender", { required: true })}
            className={styles.input}
          />
          {errors.gender && (
            <span className={styles.error}>Gender is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>
            Image URL
          </label>
          <input
            type="text"
            id="image"
            {...register("image", { required: true })}
            className={styles.input}
          />
          {errors.image && (
            <span className={styles.error}>Image URL is required</span>
          )}
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StudentModal;

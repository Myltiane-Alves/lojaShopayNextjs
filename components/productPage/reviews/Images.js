import { useState } from "react";
import { useRef } from "react";
import { MdOutlineRemoveCircle } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Images({ images, setImages }) {
    const [error, setError] = useState("");
    const inputRef = useRef(null);
    const handleImages = (e) => {
        
    }
    return (
        <div>
        <input
          type="file"
          ref={inputRef}
          hidden
          onChange={handleImages}
          multiple
          accept="image/png,image/jpeg,image/webp"
        />
        <button
          className={styles.login_btn}
          style={{ width: "150px" }}
          onClick={() => inputRef.current.click()}
        >
          Add images
        </button>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.imgs_wrap}>
          {images.length > 0 &&
            images.map((img, i) => (
              <span key={i}>
                <MdOutlineRemoveCircle onClick={() => removeImage(img)} />
                <img src={img} alt="" />
              </span>
            ))}
        </div>
      </div>
    )
}
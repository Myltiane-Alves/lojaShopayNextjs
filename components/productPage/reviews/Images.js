import { useState } from "react";
import { useRef } from "react";
import { MdOutlineRemoveCircle } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Images({ images, setImages }) {
    const [error, setError] = useState("");
    const inputRef = useRef(null);
    const handleImages = (e) => {
      let files = Array.from(e.target.files);
      console.log(files);
      files.forEach((img, i)=> {
        if(images.length == 3 || i == 2) {
          setError("Maxímo 3 imagens são autorizadas.");
          return;
        }
        if(
          img.type !== "image/jpeg" &&
          img.type !== "image/png" &&
          img.type !== "image/webp"
        ) {
          setError(
            `${img.name} formato não suportado. Formatos Aceitos, JPEG, PNG e WEBP`
          );
          files = files.filter((item) => item.name !== img.name);
          return;
        } else if (img.size > 1024 * 1024 * 5) {
          setError(`${img.name} tamanho não suportado. Tamanho máximo 5MB`);
          files = files.filter((item) => item.name !== img.name);
          return;
        } else {
          setError("");
          const reader = new FileReader();
          reader.readAsDataURL(img);
          reader.onload = (e) => {
            setImages((images) => [...images, e.target.result]);
          };
        }
      });
    };

    const removeImage = (image) => {
      setImages((images) => images.filter((item) => item !== image));
      if (images.length <= 3) {
        setError("");
      }
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
          style={{ width: "200px" }}
          onClick={() => inputRef.current.click()}
        >
          Adicionar imagens
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
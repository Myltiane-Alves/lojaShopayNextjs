import { Pagination } from "@mui/material";
import { useState } from "react";
import usePagination from "./Pagination";
import Review from "./Review";
import styles from "./styles.module.scss";
import TableHeader from "./TableHeader";

export default function Table({ reviews, allSizes, colors }) {
    const [page, setPage] = useState(1);
    return (
        <div className={styles.table}>
            <TableHeader
                reviews={reviews}
                allSizes={[{ size: "All" }, ...allSizes]}
                colors={[{ color: "", image: "" }, ...colors]}
            />
        </div>
    )
}
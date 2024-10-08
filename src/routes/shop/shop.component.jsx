
import "./shop.styles.scss";
import {Route, Routes} from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchCategoriesStart} from "../../store/categories/category.action";

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategoriesStart())
    }, [dispatch])

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}></Route>
            <Route path=":category" element={<Category/>}></Route>
        </Routes>
    );
}

export default Shop;

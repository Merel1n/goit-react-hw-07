import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { setFilterValue } from "../../redux/filtersSlice";

const SearchBox = () => {
  const inputValue = useSelector((state) => {
    state.filter.filterValue;
  });
  const dispatch = useDispatch();
  const handleChange = (evt) => {
    dispatch(setFilterValue(evt.target.value));
  };

  return (
    <div className={css.container}>
      <p className={css.text}>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Name"
      />
    </div>
  );
};
export default SearchBox;

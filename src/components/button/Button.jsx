import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className={css.button}>
      Load more
    </button>
  );
};

export default Button;

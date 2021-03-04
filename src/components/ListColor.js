import React from 'react';
import './ListColor.css';

function ListColor() {
  return (
    <div>
      <div className="paragrafWrapper">
        <p className="paragraf">Для изменения цвета нажмите:</p>{' '}
      </div>
      <ol className="listColor">
        <li className="listColorChild"> R-красный</li>
        <li className="listColorChild">B-черный </li>
        <li className="listColorChild"> Y-желтый</li>
        <li className="listColorChild"> G-зеленый</li>
        <li className="listColorChild">S-серебряный</li>
      </ol>
    </div>
  );
}

export default ListColor;

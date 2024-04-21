import React from 'react';

type Props={
    className?:string
}

export const PokeBallIcon = (props:Props) => (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 182 182">
        <defs>
            <style>{`.cls-1{fill:none;}.cls-2{fill:#fff;}`}</style>
        </defs>
        <g id="Capa_2">
            <g id="Capa_1-2">
                <path className="cls-1" d="M75.72,91a15.28,15.28,0,0,0,30.56,0c0-.13,0-.26,0-.39H75.74C75.74,90.74,75.72,90.87,75.72,91Z" />
                <path className="cls-1" d="M116.28,91a25.28,25.28,0,0,1-50.56,0c0-.13,0-.26,0-.39H10c0,.13,0,.26,0,.39a81,81,0,0,0,162,0c0-.13,0-.26,0-.39H116.26C116.27,90.74,116.28,90.87,116.28,91Z" />
                <path className="cls-2" d="M91,116.28A25.31,25.31,0,0,0,116.28,91c0-.13,0-.26,0-.39h-10c0,.13,0,.26,0,.39a15.28,15.28,0,0,1-30.56,0c0-.13,0-.26,0-.39h-10c0,.13,0,.26,0,.39A25.31,25.31,0,0,0,91,116.28Z" />
                <path className="cls-2" d="M180.78,76.13A91,91,0,1,0,182,91,91.15,91.15,0,0,0,180.78,76.13ZM91,172A81.1,81.1,0,0,1,10,91c0-.13,0-.26,0-.39H75.74a15.26,15.26,0,0,1,30.52,0H172c0,.13,0,.26,0,.39A81.1,81.1,0,0,1,91,172Z" />
            </g>
        </g>
    </svg>
);

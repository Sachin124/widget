import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, selected, onSelectedChange, label }) => {

    const [open, selectOpen] = useState(false);

    const ref = useRef();

    useEffect(()=>{

        const onBodyClick = (event)=>{
            if (ref && ref.current.contains(event.target)) {
                return;
            }
            selectOpen(false);
        }
        document.addEventListener('click', onBodyClick);

        return ()=>{
            document.removeEventListener('click', onBodyClick)
        }
    }, []);

    const renderedOptions = options.map(option => {
        if (option.value === selected.value) {
            return null
        }
        return (
            <div
                key={option.value}
                onClick={() => onSelectedChange(option)}
                className="item">{option.label}</div>
        )
    });

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div
                    onClick={() => selectOpen(!open)}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div
                        className={`menu ${open ? 'visible transition' : ''}`}
                    >
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
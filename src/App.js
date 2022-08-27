import React, { useState } from 'react';
import Accordian from './component/Accordian';
import Dropdown from './component/Dropdown';
import Header from './component/Header';
import Route from './component/Routs';
import Search from './component/Search';
import Translate from './component/Translate';

const items = [
    {
        title: 'What is React',
        content: 'React is a front end javascript framework'
    },
    {
        title: 'Why user React',
        content: 'React is a famous javascript library amoung engineers'
    },
    {
        title: 'How does you use react',
        content: 'You can use React by creating components'
    }
];

const options = [
    {
        label: "The color of Red",
        value: 'red'
    },
    {
        label: 'The color of Green',
        value: 'green'
    },
    {
        label: 'A shade of Blue',
        value: 'blue'
    }
];


export default () => {
    const [selected, setSelected] = useState(options[0]);

    return (
        <div>
            <Header />
            <Route path='/'>
                <Accordian items={items} />
            </Route>


            <Route path='/list'>
                <Search />
            </Route>

            <Route path='/dropdown'>
                <Dropdown
                    label="Select a color"
                    options={options}
                    selected={selected}
                    onSelectedChange={setSelected}
                />
            </Route>

            <Route path='/translate'>
                <Translate />
            </Route>
        </div>
    );
};
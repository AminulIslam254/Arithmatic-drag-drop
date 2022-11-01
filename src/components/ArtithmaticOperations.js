import { Button, makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useState } from 'react'


const usestyles = makeStyles(() => ({
    box1: {
        display: "flex",
        flexDirection: "row",
        height: 150,
        marginBottom: 7,
        justifyContent: "space-around",
        borderStyle: "solid",
    },
    boxele1: {
        border: "2px solid red",
        height: 132,
        width: 142,
        backgroundColor: "rgb(33, 217, 29)",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 7,
        "&:hover": {
            cursor: "move"
        }
    },
    box2: {
        height: 150,
        display: "flex",
        justifyContent: "space-around",
        marginBottom: 7,
        borderStyle: "solid",
    },
    comp1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

    },
    boxele2: {
        border: "2px solid red",
        height: 132,
        width: 142,
        backgroundColor: "rgb(33, 217, 29)",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 3,
        "&:hover": {
            cursor: "pointer"
        },
        marginLeft: 2,
    },
    box3: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 140,
        borderStyle: "dashed",
        marginLeft: 7,
    },
    btn1: {
        marginTop: 5,
        width: "100%"
    },
    cross1: {
        position: "relative",
        top: -56,
        left: 66
    }
}));




const ArtithmaticOperations = () => {

    const [numbers, setNumbers] = useState(["A", "B", "C", "D", "E"]);
    const [symbols, setSymbols] = useState(["+", "-", "*", "/"]);
    const [itemsindiv3, setItemsindiv3] = useState([]);
    let current = undefined;

    const handleDragStart = (item, index) => {
        current = item;
    }
    const handleDrop = (e) => {
        e.preventDefault();
        setItemsindiv3(oldArray => [...oldArray, current]);

    }
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handlecompClick = (e) => {
        if (e.detail === 2) {
            let val = e.currentTarget.innerText;
            setItemsindiv3(oldArray => [...oldArray, val]);
        }

    };
    const handleRHSInteger = () => {
        let val = prompt("What will be the value of RHS?");
        setItemsindiv3(oldArray => [...oldArray, val]);
    };
    const handleEvaluateClick = () => {
        axios.post("https://arithmatic-operation-drag-drop.herokuapp.com/register", itemsindiv3)
            .then(res => {
                console.log(res.data);
                alert(res.data);
            })
    };
    const handleCrossClick = (e) => {
        const name = e.target.getAttribute("name")
        setItemsindiv3(itemsindiv3.filter(item => item !== name));
    }



    const classes = usestyles();
    return (
        <>
            <div className={classes.box1}>
                {numbers.map((item, index) => {
                    return (
                        <div key={index} className={classes.boxele1} draggable
                            onDragStart={() => { handleDragStart(item, index) }}
                        >{item}</div>
                    );
                })}
            </div>
            <div className={classes.box2}>
                <div className={classes.comp1}>
                    {symbols.map((item, index) => {
                        return (
                            <div key={index} className={classes.boxele2} style={{ cursor: "move" }} draggable
                                onDragStart={() => { handleDragStart(item, index) }}
                            >{item}</div>
                        );
                    })}
                </div>
                <div className={classes.comp1}>
                    <div className={classes.boxele2} onClick={handlecompClick}>{"<"}</div>
                    <div className={classes.boxele2} onClick={handlecompClick}>{">"}</div>
                </div>
                <div className={classes.comp1}>
                    <div className={classes.boxele2} onClick={handleRHSInteger}>RHS Integer</div>
                </div>
            </div>
            <div className={classes.box3}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {itemsindiv3.map((item, index) => {
                    return (
                        <div key={index} className={classes.boxele2}>
                            <div className={classes.cross1} name={item} style={{ fontSize: 20 }} onClick={handleCrossClick}>x</div>
                            {item}
                        </div>
                    );
                })}
            </div>
            <Button className={classes.btn1} variant="contained" color="primary" onClick={handleEvaluateClick}>
                Evaluate
            </Button>
            <div>
                <h3> Note:- In the MongoDB the value of A=1,B=2,C=3,D=4,E=5</h3>
               
            </div>



        </>
    )
}

export default ArtithmaticOperations
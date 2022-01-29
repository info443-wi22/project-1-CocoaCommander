import { Button, Alert } from 'reactstrap';
import React, { useState } from 'react';
import firebase from 'firebase/app';

// here's where we set the waitlist to whatever's on the waitlist (any class that we've added that doesn't overlap)
// props.potential courses is an array of what the user has requested to add to their waitlist
// handle reg puts those classes in a good format to put into the example student
export function RegisterPotentialClasses(props) {
    const [dNone, setdNone] = useState("d-none");
    const [color, setColor] = useState("danger");
    const [msg, setMsg] = useState("");
    const [clickAlready, setCLickAlready] = useState(false);
    let onClickReg = () => {
        setdNone("");
        if (props.potentialCourses.length === 0) {
            setMsg("You still need to add a lecture and a lab.");
        } else if (props.potentialCourses.length === 1) {
            setMsg("You still need to add a lab.");
        } else {
            props.handleReg(props.potentialCourses);

            firebase.database().ref('student').set({
                schedule: props.schedule
            });

            if (!clickAlready) {
                setColor("warning");
                setMsg("Please click again to fully register.");
                setCLickAlready(true);
            } else {
                setColor("success");
                setMsg("Successfully registered!");
            }
        }
    };

    return (
        <div>
            <Button color="primary" onClick={onClickReg}>
                Register for waitlists
            </Button>
            <Alert color={color} className={dNone}>
                {msg}
            </Alert>
        </div>

    );
}

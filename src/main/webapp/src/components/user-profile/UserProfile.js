import React from "react";
import {Button, Card, Result} from "antd";
import './UserProfile.css'
import {Link} from "react-router-dom";

const {Meta} = Card;

const UserProfile = (props) => {
    return (
        <div>

            {props.user &&
                <div className="card">
                    <Card
                        key={props.user.id}
                        className="profileCard"
                        cover={
                            <img alt={"userAvatar"}
                                 src={"https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png"}
                            />
                        }>
                        <Meta
                            title={props.user.username}
                            description={props.user.email}
                        />
                    </Card>
                </div>}

            {props.user &&
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary" style={{borderRadius: '40px'}}>
                        <Link to={"/"}>Back Home </Link>
                    </Button>}
                />}

        </div>

    )
}

export default UserProfile
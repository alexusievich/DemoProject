import React, {FC} from "react";
import {Button, Card, Result} from "antd";
import './UserProfile.css'
import {Link} from "react-router-dom";
import {AppRoutes} from "../../models/routes/routes.enum";

const {Meta} = Card;

type UserProfileProps = {
    user: any;
}

const UserProfile: FC<UserProfileProps> = ({user}) => {
    return (
        <div>

            {user &&
                <div className="card">
                    <Card
                        key={user.id}
                        className="profileCard"
                        cover={
                            <img alt={"userAvatar"}
                                 src={"https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png"}
                            />
                        }>
                        <Meta
                            title={user.username}
                            description={user.email}
                        />
                    </Card>
                </div>}

            {user &&
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary" style={{borderRadius: '40px'}}>
                        <Link to={AppRoutes.BaseUrl}>Back Home </Link>
                    </Button>}
                />}

        </div>

    )
}

export default UserProfile
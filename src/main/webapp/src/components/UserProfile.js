import React from "react";
import {Button, Card, Result} from "antd";
import '../styles/UserProfile.css'
import {Link} from "react-router-dom";

const {Meta} = Card;

class UserProfile extends React.Component {

    render() {

        return (
            <div>

                {this.props.user &&
                <div className="card">
                    <Card
                          key={this.props.user.id}
                          className="profileCard"
                          cover={
                              <img alt={"userAvatar"}
                                   src={"https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png"}
                              />
                          }>
                        <Meta
                            title={this.props.user.username}
                            description={this.props.user.email}
                        />
                    </Card>
                </div>}

                {!this.props.user &&
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
}

export default UserProfile
import React from "react";
import firebase from 'firebase';
import {Button, Text, View} from "react-native";
import {CheckBox} from "react-native-elements";
import {Spinner} from "../utils/Spinner";
import {Card} from "../utils/Card";
import {CardSection} from "../utils/CardSection";
import {Input} from "../utils/Input";
import {StatusBar} from "react-native";
import registerForPushNotificationsAsync from "../api/notification";

export class LoginView extends React.Component {
    static navigationOptions = {
        title: 'Login/Sign Up',
        headerStyle: {paddingTop: StatusBar.currentHeight}
    }

    constructor(props) {
        super(props);

        console.ignoredYellowBox = [
            'Setting a timer'
        ];

        this.state = {
            email: "", password: "", loginError: "", signUpError: "",
            user: null, viewOnly: false, loading: false
        };
    }

    _loginUser(email, password) {
        console.log("LoginView::_loginUser : email = ", email);
        this.setState({loading: true});
        this.setState({loginError: "", signUpError: ""});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                this.setState({loading: false});
                registerForPushNotificationsAsync();
                this.props.navigation.navigate('Main');
            })
            .catch(error => {
                console.log("LoginView::_loginUser : Login failed");
                this.setState({loginError: error.message});
            });
    }

    _signUpUser(email, password) {
        console.log("LoginView::_signUpUser : email = ", email);
        this.setState({loginError: "", signUpError: ""});

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                firebase.database().ref("/users")
                    .child(user.uid).set({viewOnly: this.state.viewOnly});
            })
            .catch(error => {
                console.log("LoginView::_signUpUser : Login failed", error);
                this.setState({signUpError: error.message});
            });
    }

    renderLoginError() {
        if (this.state.loginError) {
            return (
                <View style={{backgroundColor: 'white'}}>
                    <Text style={styles.errorTextStyle}>
                        {this.state.loginError}
                    </Text>
                </View>
            );
        }
    }

    renderSignUpError() {
        if (this.state.signUpError) {
            return (
                <View style={{backgroundColor: 'white'}}>
                    <Text style={styles.errorTextStyle}>
                        {this.state.loginError}
                    </Text>
                </View>
            );
        }
    }

    renderLoginButton() {
        if (this.state.signUpError) {
            return <Spinner size={'large'}/>;
        }
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Button
                    onPress={() => this._loginUser(this.state.email, this.state.password)}
                    title={"Login"}
                />
            </View>
        );
    }

    renderSignUpButton() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <CheckBox
                    title={'View Only'}
                    checked={this.state.viewOnly}
                    onPress={() => this.setState({viewOnly: !this.state.viewOnly})}
                />
                <Button
                    onPress={() => this._signUpUser(this.state.email, this.state.password)}
                    title={"Sign up"}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Card>
                    <CardSection>
                        <Input
                            label={"Email"}
                            placeholder={"email@yahoo.com"}
                            onChangeText={(text) => this.setState({email: text})}
                            value={this.state.email}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            secureTextEntry
                            label={"Password"}
                            placeholder={"password"}
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}
                        />
                    </CardSection>
                    {this.renderLoginError()}
                    <CardSection>
                        {this.renderLoginButton()}
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>
                        <Input
                            label={"Email"}
                            placeholder={"email@yahoo.com"}
                            onChageText={(text) => this.setState({email: text})}
                            value={this.state.email}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            secureTextEntry
                            label="Password"
                            placeholder="password"
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}
                        />
                    </CardSection>
                    {this.renderSignUpError()}
                    <CardSection>
                        {this.renderSignUpButton()}
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    chart: {
        height: 300,
        width: 300
    }
};
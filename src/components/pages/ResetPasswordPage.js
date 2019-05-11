import React, { useSate } from "react";
import { Message } from "semantic-ui-react";
import { validateToken, resetPassword } from "../../actions/auth";
import ResetPasswordForm from "../forms/ResetPasswordForm";

const ResetPasswordPage = () =>{
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .validateToken(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  const submit = data =>
    this.props
      .resetPassword(data)
      .then(() => this.props.history.push("/login"));


    const { loading, success } = this.state;
    const token = this.props.match.params.token;
    return (
      <div>
        {loading && <Message>Loading</Message>}
        {!loading && success && (
          <ResetPasswordForm submit={this.submit} token={token} />
        )}
        {!loading && !success && <Message>Invalid Token</Message>}
      </div>
    );
  }




export default ResetPasswordPage;

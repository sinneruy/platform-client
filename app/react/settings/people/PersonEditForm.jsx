import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { createStore } from "redux"
import InlineLoading from "react/common/ui/InlineLoading";
import { Field, reduxForm } from 'redux-form'
import connectWithStore from "react/react-transition/connectWithStore";
import { getEditing } from "react/common/state/people/people.reducers"


const propTypes = {
    person: PropTypes.shape({
        id: PropTypes.number
    }),
    updatePerson: PropTypes.func.isRequired,
    roles: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoadingRoles: PropTypes.bool.isRequired,
    requestPerson: PropTypes.func.isRequired
    // error: PropTypes.shape({
    //     message: PropTypes.string
    // }).isRequired
};

const defaultProps = {
    person: undefined
};

class PersonEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copyOfPerson: this.props.person ? this.props.person : {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.renderRoles = this.renderRoles.bind(this);
    }

    componentDidMount() {
        // PersonEditForm = connectWithStore(PersonEditForm, (state)=>{initialValues: getEditing(state)})
        console.log("store in form ", this.props.store)
        // Need UI to handle failures for this.
        // Error currently saved to state.error

        if (this.props.person === undefined) {
            // if the ID doesn't match the URL params
            this.props.requestPerson(this.props.match.params.id)
                
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const person = Object.assign({}, this.state);
        this.props.saveNewPerson(person);
        // after success, clear state
        // after failure, state remains
        // TBD after we figure out endpoints
    }

    renderRoles() {
        return (
            <label htmlFor="role">
                Role
                <Field
                    name="role"
                    component="select"
                >
                    <option value="">
                        Select a role
                    </option>
                    {this.props.roles.map(role => (
                        <option key={role.id} value={role.name}>
                            {role.display_name}
                        </option>
                    ))}
                </Field>
            </label>
        );
    }

    render() {
        return (
            <main role="main">
                <div>
                    <h3>Add Contact</h3>
                    <p>
                        Add members of your team, stakeholders, and other
                        members of your community to Ushahidi.
                    </p>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="realname">
                        Name
                        <Field
                            component="input"
                            type="text"
                            placeholder="What is this person's full name"
                            name="realname"
                            required
                        />
                    </label>
                    <label htmlFor="email">
                        Email
                        <Field
                            component="input"
                            type="text"
                            placeholder="email"
                            name="email"
                            required
                        />
                    </label>
                    {this.props.isLoadingRoles ? (
                        <InlineLoading />
                    ) : (
                        this.renderRoles()
                    )}
                    <Link to="/settings/TODO/someplaceholderofsomekind">
                        <button className="button-beta">Cancel</button>
                    </Link>
                    <button type="submit">Submit</button>
                </form>
            </main>
        );
    }
}

PersonEditForm.propTypes = propTypes;
PersonEditForm.defaultProps = defaultProps;

function mapStateToProps(state, ownProps) {
  return {
    initialValues: getEditing(state)
}
}

PersonEditForm.propTypes = propTypes;
PersonEditForm.defaultProps = defaultProps;

// export default connectWithStore(PersonEditForm, mapStateToProps)(reduxForm({
//   // a unique name for the form
//   form: 'editPerson'
// })(PersonEditForm))

PersonEditForm = reduxForm({
  // a unique name for the form
  form: 'editPerson',
  enableReinitialize: true
})(PersonEditForm)

export default connectWithStore(PersonEditForm, mapStateToProps)

// export default PersonEditForm;

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// gray background
const backdropStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
}

const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxWidth: 540,
    minHeight: 300,
    margin: '0 auto',
    padding: 30,
    position: "relative"
};

const modalRoot = document.getElementById("modal-root");

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement("div");
    }
    componentDidMount() {       
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {       
        modalRoot.removeChild(this.el);
    }

    render() {
        var modalUI = (
            <div style={backdropStyle}>
                <div style={modalStyle}>
                    {this.props.children}
                </div>
            </div>
        );
        if (!this.props.isShow) {
            return null;
        }
        return ReactDOM.createPortal (
            modalUI,
            this.el,
        );
    }
}

const mapStateToProps = state => ({
    isShow:state.modal.isShow
});


export default connect(mapStateToProps) (Modal);



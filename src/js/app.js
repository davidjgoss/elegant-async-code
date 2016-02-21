(function() {
    function loadMessageList() {
        return fetch("data/messages.json").then(function(response) {
            return response.json();
        });
    }

    function countUnread(messages) {
        return messages.filter(function(message) {
            return message.unread;
        }).length;
    }

    function loadMessageBody(messageId) {
        return fetch("data/messages/" + messageId + ".json").then(function(response) {
            return response.json();
        });
    }

    var Header = React.createClass({
        render: function() {
            return (
                <header className="page-header">
                    <div className="row">
                        <div className="col-xs-6">
                            <h1 className="eac-title">Inbox <small>{this.props.count} unread</small></h1>
                        </div>
                        <div className="col-xs-6 text-right">
                            <button className="btn btn-primary"><i className="glyphicon glyphicon-edit" /> Compose</button>
                        </div>
                    </div>
                </header>
            );
        }
    });

    var MessageItem = React.createClass({
        render: function() {
            var itemClass = "list-group-item eac-list__item";
            if (this.props.message.unread) {
                itemClass += " eac-list__item--unread";
            }
            if (this.props.activeId === this.props.message.id) {
                itemClass += " active";
            }
            var clickHandler = function(e) {
                e.preventDefault();
                this.props.openMessage(this.props.message.id);
            }.bind(this);

            return (
                <a href="#" onClick={clickHandler} className={itemClass}>
                    <h4 className="eac-list__from list-group-item-heading">{this.props.message.from}</h4>
                    <h5 className="eac-list__subject">{this.props.message.subject}</h5>
                    <p className="eac-list__snippet">{this.props.message.snippet}</p>
                </a>
            );
        }
    });

    var MessageList = React.createClass({
        render: function() {
            var activeId = this.props.activeId,
                openMessage = this.props.openMessage,
                messageNodes = this.props.list.map(function(message) {
                return (
                    <MessageItem key={message.id} message={message} activeId={activeId} openMessage={openMessage} />
                );
            });

            return (
                <div className="list-group eac-list">
                    {messageNodes}
                </div>
            );
        }
    });

    var MessageView = React.createClass({
        rawMarkup: function() {
            return {__html: this.props.message.body};
        },
        render: function() {
            return (
                <div className="eac-view">
                    <div className="row">
                        <div className="col-xs-9">
                            <h2 className="eac-view__from">{this.props.message.from}</h2>
                            <h4 className="eac-view__subject">{this.props.message.subject}</h4>
                        </div>
                        <div className="col-xs-3 text-right">
                            <button className="btn btn-link"><i className="glyphicon glyphicon-print" /></button>
                            <button className="btn btn-link"><i className="glyphicon glyphicon-share-alt" /></button>
                            <button className="btn btn-link"><i className="glyphicon glyphicon-folder-close" /></button>
                            <button className="btn btn-link"><i className="glyphicon glyphicon-trash" /></button>
                        </div>
                    </div>
                    <div className="eac-view__body" dangerouslySetInnerHTML={this.rawMarkup()} />
                </div>
            );
        }
    });

    var Inbox = React.createClass({
        updateCount: function(messages) {
            var unread = countUnread(messages);
            this.setState({unread: unread});
            document.title = "Inbox (" + unread + ")";
            return messages;
        },
        updateList: function(messages) {
            this.setState({list: messages});
            return messages;
        },
        openFirstMessage: function(messages) {
            return this.openMessage(messages[0].id);
        },
        openMessage: function(messageId) {
            return loadMessageBody(messageId)
                .then(this.updateView);
        },
        updateView: function(message) {
            this.setState({
                activeId: message.id,
                view: message
            });
        },
        refreshMessages: function() {
            return loadMessageList()
                .then(this.updateCount)
                .then(this.updateList)
                .then(this.openFirstMessage);
        },
        componentDidMount: function() {
            this.refreshMessages();
        },
        getInitialState: function() {
            return {
                activeId: 0,
                unread: 0,
                list: [],
                view: {}
            };
        },
        render: function() {
            var openMessage = this.openMessage;
            return (
                <div className="inbox">
                    <Header count={this.state.unread} />
                    <div className="row">
                        <div className="col-xs-12 col-sm-5 col-md-4">
                            <MessageList list={this.state.list} activeId={this.state.activeId} openMessage={openMessage} />
                        </div>
                        <div className="col-xs-12 col-sm-7 col-md-8">
                            <MessageView message={this.state.view} />
                        </div>
                    </div>
                </div>
            );
        }
    });

    ReactDOM.render(<Inbox />, document.getElementById("app"));
}());


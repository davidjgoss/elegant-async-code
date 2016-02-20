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

    function loadMessageBody(message) {
        return fetch("data/body.html").then(function(response) {
            return response.text();
        }).then(function(body) {
            return {
                "id": message.id,
                "from": message.from,
                "subject": message.subject,
                "body": body
            };
        });
    }

    var Header = React.createClass({
        render: function() {
            return (
                <header className="page-header">
                    <h1>Inbox <small>{this.props.count} unread</small></h1>
                </header>
            );
        }
    });

    var MessageItem = React.createClass({
        render: function() {
            var itemClass = "list-group-item";
            if (this.props.activeId === this.props.message.id) {
                itemClass += " active";
            }
            var clickHandler = function(e) {
                e.preventDefault();
                this.props.openMessage(this.props.message);
            }.bind(this);

            return (
                <a href="#" onClick={clickHandler} className={itemClass}>
                    <h3 className="list-group-item-heading"><strong>{this.props.message.from}</strong></h3>
                    <h4>{this.props.message.subject}</h4>
                    <p>{this.props.message.snippet}</p>
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
                <div className="eac-list list-group">
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
                <div>
                    <h2>{this.props.message.from}</h2>
                    <h3>{this.props.message.subject}</h3>
                    <div dangerouslySetInnerHTML={this.rawMarkup()} />
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
            return this.openMessage(messages[0]);
        },
        openMessage: function(message) {
            return loadMessageBody(message)
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


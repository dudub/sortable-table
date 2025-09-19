import './App.css';
import { Router, Route, Switch } from './components/core/router/Router';
import { Home } from './components/pages/Home';
import { TablePage } from './components/pages/TablePage';
import { IssueDetailsPage } from './components/pages/IssueDetailsPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/issues/:id" component={IssueDetailsPage} />
          <Route path="/issues" component={TablePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

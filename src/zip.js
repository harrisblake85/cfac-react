<h1>{this.state.hello}</h1>
{this.state.submissions &&
  <Submissions

    submissions={this.state.submissions}
    showSubmission = {this.showSubmission.bind(this)}
    />
}

{this.state.best &&
  <Submission
    submission = {this.state.best}
    showSubmission = {this.showSubmission.bind(this)}

    />
}
{
  this.state.submission &&
  <Submission
    submission = {this.state.submission}
    />
}
{
  <button onClick={
      this.showHome.bind(this)
    }>Home</button>

}
{
  <button onClick={
      this.showGallery.bind(this)
    }>Gallery</button>

}

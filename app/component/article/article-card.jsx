import React from 'react'
import {
  Card,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card'
import {Link} from 'react-router'

export class ArticleCard extends React.Component {
  render () {
    return (
      <Card style={{'margin': '12px'}}>
        <Link to={this.props.articlePath}>
          <CardMedia
            overlay={<CardTitle title={this.props.title} />}
          >
            <img src={this.props.imgPath} />
          </CardMedia>
          <CardText style={{'textDecoration': 'none'}}>
            {this.props.text}
          </CardText>
        </Link>
      </Card>
    )
  }
}
ArticleCard.propTypes = {
  title: React.PropTypes.string,
  imgPath: React.PropTypes.string,
  text: React.PropTypes.string,
  articlePath: React.PropTypes.string
}

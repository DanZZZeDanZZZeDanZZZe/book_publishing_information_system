import PageWrapper from '../components/PageWrapper'
import ContentForEntity from '../components/ContentForEntity'

const projectSchema = {
  title: 'project',
  fields: [
    {
      title: 'date',
      field: 'date',
      container: 'input',
      type: 'date',
    },
    {
      title: 'deadline',
      field: 'deadline',
      container: 'input',
      type: 'date',
    },
    {
      title: 'books',
      field: 'books',
      container: 'select',
      source: {
        entity: 'book',
        fields: ['name'],
      },
      options: [],
    },
  ],
}

function ProjectPage(props) {
  return (
    <PageWrapper>
      <ContentForEntity entitySchema={projectSchema} />
    </PageWrapper>
  )
}

export default ProjectPage

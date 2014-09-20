"""Added sensor group

Revision ID: 20bef1bf0e37
Revises: 55865a33c659
Create Date: 2014-08-29 18:56:16.146094

"""

# revision identifiers, used by Alembic.
revision = '20bef1bf0e37'
down_revision = '55865a33c659'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('widgetSensor', sa.Column('group', sa.Boolean(), nullable=True))
    op.add_column('widgetSensor', sa.Column('groupmax', sa.Integer(), nullable=True))
    op.add_column('widgetSensor', sa.Column('groupmin', sa.Integer(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('widgetSensor', 'groupmin')
    op.drop_column('widgetSensor', 'groupmax')
    op.drop_column('widgetSensor', 'group')
    ### end Alembic commands ###

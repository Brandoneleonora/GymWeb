"""first page

Revision ID: ad583f9046ab
Revises: 
Create Date: 2024-03-28 09:14:19.976553

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ad583f9046ab'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('chat',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('chat_name', sa.String(), nullable=True),
    sa.Column('chat_image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('followers', sa.Integer(), nullable=True),
    sa.Column('following', sa.Integer(), nullable=True),
    sa.Column('bio', sa.String(), nullable=True),
    sa.Column('lift_type', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('background_image', sa.String(), nullable=True),
    sa.Column('profile_picture', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('chat_tables',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('chat_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['chat_id'], ['chat.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    op.create_table('friends',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('message_body', sa.Integer(), nullable=True),
    sa.Column('message_user', sa.String(), nullable=True),
    sa.Column('chat_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['chat_id'], ['chat.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('post_username', sa.String(), nullable=True),
    sa.Column('post_type', sa.String(), nullable=False),
    sa.Column('body', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('likes', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('liked_posts',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    op.create_table('saved_posts',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('saved_posts')
    op.drop_table('liked_posts')
    op.drop_table('posts')
    op.drop_table('messages')
    op.drop_table('friends')
    op.drop_table('chat_tables')
    op.drop_table('users')
    op.drop_table('chat')
    # ### end Alembic commands ###
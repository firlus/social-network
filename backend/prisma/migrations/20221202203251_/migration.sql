BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_username_key];

-- AlterTable
ALTER TABLE [dbo].[User] ALTER COLUMN [username] NVARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[FollowRelation] (
    [userId] INT NOT NULL,
    [followsId] INT NOT NULL,
    CONSTRAINT [FollowRelation_pkey] PRIMARY KEY CLUSTERED ([userId],[followsId])
);

-- CreateTable
CREATE TABLE [dbo].[Post] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Post_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [text] VARCHAR(255) NOT NULL,
    [authorId] INT NOT NULL,
    CONSTRAINT [Post_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[LikeRelation] (
    [userId] INT NOT NULL,
    [postId] INT NOT NULL,
    CONSTRAINT [LikeRelation_pkey] PRIMARY KEY CLUSTERED ([userId],[postId])
);

-- AddForeignKey
ALTER TABLE [dbo].[FollowRelation] ADD CONSTRAINT [FollowRelation_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[FollowRelation] ADD CONSTRAINT [FollowRelation_followsId_fkey] FOREIGN KEY ([followsId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [Post_authorId_fkey] FOREIGN KEY ([authorId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LikeRelation] ADD CONSTRAINT [LikeRelation_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[LikeRelation] ADD CONSTRAINT [LikeRelation_postId_fkey] FOREIGN KEY ([postId]) REFERENCES [dbo].[Post]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

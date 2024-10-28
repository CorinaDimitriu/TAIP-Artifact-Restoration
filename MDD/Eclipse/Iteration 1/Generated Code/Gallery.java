/**
 */
package com.garagu.emf.fillthevoid.model.FillTheVoid;

import org.eclipse.emf.common.util.EList;

import org.eclipse.emf.ecore.EObject;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Gallery</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getId <em>Id</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getGalleryName <em>Gallery Name</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getDescription <em>Description</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#isIsDefault <em>Is Default</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getPaintings <em>Paintings</em>}</li>
 * </ul>
 *
 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getGallery()
 * @model
 * @generated
 */
public interface Gallery extends EObject {
	/**
	 * Returns the value of the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Id</em>' attribute.
	 * @see #setId(String)
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getGallery_Id()
	 * @model
	 * @generated
	 */
	String getId();

	/**
	 * Sets the value of the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getId <em>Id</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Id</em>' attribute.
	 * @see #getId()
	 * @generated
	 */
	void setId(String value);

	/**
	 * Returns the value of the '<em><b>Gallery Name</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Gallery Name</em>' attribute.
	 * @see #setGalleryName(String)
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getGallery_GalleryName()
	 * @model
	 * @generated
	 */
	String getGalleryName();

	/**
	 * Sets the value of the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getGalleryName <em>Gallery Name</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Gallery Name</em>' attribute.
	 * @see #getGalleryName()
	 * @generated
	 */
	void setGalleryName(String value);

	/**
	 * Returns the value of the '<em><b>Description</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Description</em>' attribute.
	 * @see #setDescription(String)
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getGallery_Description()
	 * @model
	 * @generated
	 */
	String getDescription();

	/**
	 * Sets the value of the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getDescription <em>Description</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Description</em>' attribute.
	 * @see #getDescription()
	 * @generated
	 */
	void setDescription(String value);

	/**
	 * Returns the value of the '<em><b>Is Default</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Is Default</em>' attribute.
	 * @see #setIsDefault(boolean)
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getGallery_IsDefault()
	 * @model
	 * @generated
	 */
	boolean isIsDefault();

	/**
	 * Sets the value of the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#isIsDefault <em>Is Default</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Is Default</em>' attribute.
	 * @see #isIsDefault()
	 * @generated
	 */
	void setIsDefault(boolean value);

	/**
	 * Returns the value of the '<em><b>Paintings</b></em>' containment reference list.
	 * The list contents are of type {@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting}.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Paintings</em>' containment reference list.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getGallery_Paintings()
	 * @model containment="true"
	 * @generated
	 */
	EList<Painting> getPaintings();

} // Gallery
